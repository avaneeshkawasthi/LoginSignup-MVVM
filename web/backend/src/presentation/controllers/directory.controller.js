export class DirectoryController {
  constructor(directoryService) {
    this.directoryService = directoryService;
  }

  list = async (_req, res, next) => {
    try {
      const users = await this.directoryService.listUsers();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  };
}
