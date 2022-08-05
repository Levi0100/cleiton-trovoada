import ms from 'enhanced-ms'
import translator from '@iamtraction/google-translate'

export default async(number) => {
    const time = ms(number);
    const translated = await translator(time, { to: 'pt' });
    return translated.text;
}