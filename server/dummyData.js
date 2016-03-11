import Post from './models/post';
import Chirp from './models/chirp';

export default function () {
    Chirp.count().exec((err, count) => {
        if (count > 0) {
            return;
        }

        const chirp1 = new Chirp({ username: 'foo', loc: [47.6, -122.3], cuid: '00000', content: "Hello, Seattle!" });
        const chirp2 = new Chirp({ username: 'bar', loc: [37.78,-122.4], cuid: '00001', content: "Hello, San Francisco!" });
        Chirp.create([chirp1, chirp2], (error) => {
            if (!error) {
                console.log('Created 2 chirps!');
            }
            else {
                console.log('Error pre-creating chirps:');
                console.log(error);
            }
        });
    });
}
