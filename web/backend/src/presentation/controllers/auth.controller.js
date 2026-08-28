export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = (req, res, next) => {
    try {
      const session = this.authService.login(req.body);
      res.json(session);
    } catch (error) {
      next(error);
    }
  };

  signup = (req, res, next) => {
    try {
      const session = this.authService.signup(req.body);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  };

  me = (req, res, next) => {
    try {
      const user = this.authService.currentUser(req.userId);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  };
}
