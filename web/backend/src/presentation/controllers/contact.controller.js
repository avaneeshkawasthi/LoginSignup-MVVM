export class ContactController {
  constructor(contactService) {
    this.contactService = contactService;
  }

  submit = (req, res, next) => {
    try {
      const message = this.contactService.submit(req.body);
      res.status(201).json({
        id: message.id,
        message: 'Thanks — a Cartek specialist will reply shortly.'
      });
    } catch (error) {
      next(error);
    }
  };
}
