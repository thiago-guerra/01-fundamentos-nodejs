import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1;
    _read() {
        const value = this.index++;
        setTimeout(() => {
            if (value > 5) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(value));
                this.push(buf);
            }
        }, 1000);
    }
}
const requestInit = {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
  };

fetch('http://localhost:3334', requestInit).then(response => {
    return response.text();
}).then(content => {
    console.log(content);
}).catch(err => {
    console.log(err);
});

