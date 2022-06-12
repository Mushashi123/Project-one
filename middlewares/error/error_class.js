class error{
    constructor(code,message){
        this.code = code,
        this.message = message
    }
    static internal(msg){
        return new error(500,msg);
    }
}

module.exports = error;