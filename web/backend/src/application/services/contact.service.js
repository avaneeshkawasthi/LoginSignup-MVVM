import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  topic: z.string().trim().min(2, 'Please choose a topic.'),
  message: z.string().trim().min(12, 'Please share a little more detail.')
});

export class ContactService {
  constructor({ contactRepository }) {
    this.contactRepository = contactRepository;
  }

  submit(input) {
    const payload = contactSchema.parse(input);
    return this.contactRepository.create(payload);
  }
}
