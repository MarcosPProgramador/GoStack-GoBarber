class AppError {
  constructor(private message: string, private statusCode: number = 400) {}
}
export default AppError;
