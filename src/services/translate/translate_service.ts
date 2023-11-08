import api from '../../commons/api';

class TranslateService {
    async translate(
        input: string,
        targetLanguage: string,
    ): Promise<string | null> {
        try {
            // wait 1000ms to simulate network latency
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return input + ' ' + targetLanguage;

            const response = await api.post(
                `/translate`,
                {
                    input,
                    target: targetLanguage,
                },
                {
                    withCredentials: true,
                },
            );
            return response.data.output as string;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async checkApiKey(): Promise<boolean> {
        try {
            const response = await api.get(`/translate/checkApiKey`, {
                withCredentials: true,
            });
            return response.data.hasApiKey as boolean;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default TranslateService;
