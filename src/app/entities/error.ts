class CustomError extends Error{
  // name: string
  // message: string

  constructor(name: string, message: string){
    super();
    this.name = name;
    this.message = message;
  }

}
module.exports = CustomError;