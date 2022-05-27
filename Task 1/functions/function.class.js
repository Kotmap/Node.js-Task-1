const { Transform } = require("stream");

const { sortme } = require("./sortme.js");
const {manh} = require("./manhathan.js")

class EncryptTransform extends Transform {
    constructor(action){
        super();
        this.action = action;
    }

    _transform(chunk, enc, done){
        let result ='';

        switch (this.action) {
            case "manh":
              chunk = chunk.toString();
              chunk = chunk.trim();
              const [int1, int2, int3, int4] = chunk.split(' ')
              let x=[int1, int2];
              let y=[int3, int4];
              result = manh(x,y);
              break;
            case "sortme":
              chunk = chunk.toString();
              chunk = chunk.trim();
              let array = chunk.split(',')
              result = sortme(array)
              break;
            default:
              process.stderr.write(("✘ Erorr") + ' "Action not found :("\n');
              process.exit(1);
          }
        this.push(result);
        done();
    }
}

module.exports = EncryptTransform;