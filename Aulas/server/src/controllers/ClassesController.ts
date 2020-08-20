import { Request, Response } from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
};

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        };

        const timeInMinutes = convertHoursToMinutes(time);

        const classes = await db ('classes') //Searched filters.week_day and filters.time on the classes_id's raws
            .whereExists(function() { //Sub-query to filter schedule
                this.select('class_schedule.*') //Select all fields inside table class_schedule
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') //Search on the table all class_id equal the filtered Id
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) //Search on the table the filters.weekday
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) //Search on the table all time.from equal the filtered Id
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) //Search on the table all time.to equal the filtered Id

            })
            .where('classes.subject','=',subject) //Filter by subject
            .join('users', 'classes.user_id', '=', 'user_id') //Inner join to bring the other user/teacher data
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    };

    async create (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            week_day,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction(); //Guarantee all insert occurs at the same time
    
        try {
            const insertUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertUsersIds[0];
        
            const insertClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to)
                };
            })
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return response.status(201).send(); //status(201) means successfully created
    
        } catch (err) {
            await trx.rollback(); //Undo any transaction occurred during the process
            console.log(err);
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}