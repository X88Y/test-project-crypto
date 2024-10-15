import axios from 'axios';
import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { IActionData, IGetActionsResponse } from './type';

dotenv.config();

const ActionDataSchema = new mongoose.Schema<IActionData>({
    trx_id: { type: String, required: true, unique: true },
    block_time: { type: String, required: true },
    block_num: { type: Number, required: true },
});

const ActionDataModel = mongoose.model<IActionData>('ActionData', ActionDataSchema);

async function fetchAndStoreActions(): Promise<void> {
    try {
        const response = await axios.post<IGetActionsResponse>(
            'https://eos.greymass.com/v1/history/get_actions',
            {
                account_name: 'eosio',
                pos: -1,
                offset: -100,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const actions = response.data.actions;

        const promises = actions.map((action) => {
            try {
                const { action_trace } = action;
                const { trx_id, block_time, block_num } = action_trace;

                return ActionDataModel.updateOne(
                    { trx_id },
                    { trx_id, block_time, block_num },
                    { upsert: true }
                ).exec();
            } catch (error) {
                console.error('Ошибка при записи:', error);
            }
        });

        await Promise.all(promises);
        console.log('Данные успешно сохранены');
    } catch (error) {
        console.error('Ошибка при получении или сохранении действий:', error);
    }
}

const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/';

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Успешно подключено к MongoDB');
    })
    .catch((err: any) => {
        console.error('Ошибка подключения к MongoDB:', err);
    });

cron.schedule('* * * * *', fetchAndStoreActions).start();
