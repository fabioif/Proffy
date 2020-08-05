import { Request, Response} from 'express'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHoursToMinutes';


interface ScheuduleItem{
    week_day: number;
    from: string;
    to :string;
}

export default class ClassesController{

    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!week_day || !subject || !time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes').whereExists(function(){
            this.select('class_scheudule.*').from('class_scheudule').whereRaw('`class_scheudule`.`class_id` =  `classes`.`id`')
            .whereRaw('`class_scheudule`.`week_day` = ??', [Number (week_day)])
            .whereRaw('`class_scheudule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_scheudule`.`to` > ??', [timeInMinutes])

        }).where('classes.subject', '=' , subject)
        .join('users','classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);
       
        return response.json(classes);
    }

    async Create(request: Request, response: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheudule
        } = request.body;
    
    
        const trx = await db.transaction();
    
        try{    const insertedUsersId = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
    
        const user_id = insertedUsersId[0];
    
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        });
    
        const class_id = insertedClassesIds[0];
    
       const classScheudule = scheudule.map((scheuduleItem: ScheuduleItem) => {
            return {
    
                class_id,
                week_day: scheuduleItem.week_day,
                from: convertHourToMinutes(scheuduleItem.from),
                to: convertHourToMinutes(scheuduleItem.to),
            };
        })
    
        await trx('class_scheudule').insert(classScheudule);
    
        await trx.commit();
    
        return response.status(201).send();
    }catch (err){
    
        await trx.rollback();
        // console.log(err);
        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        })  
    }
    
    }
}