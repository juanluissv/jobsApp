import db from '../../../db';

const { Tag, Job } = db;

interface Tag {
  name: string;
  code: string;
}

class TagController {
  create({ name, code }: Tag): Promise<any> {
    return Tag.create({
      name,
      code,
    }).then(() => this.getAll());
  }
  delete(id: string): Promise<any> {
    return Tag.destroy({ where: { id } }).then((deleted) => {
      if (deleted > 0) return this.getAll();
      throw new Error('Tag not found');
    });
  }
  getAll(): Promise<any> {
    return Tag.findAll();
  }
  getById(id: string): Promise<any> {
    return Tag.findOne({
      include: {
        model: Job,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        through: {
          attributes: {
            exclude: ['jobId', 'tagId', 'createdAt', 'updatedAt'],
          },
        },
      },
      where: {
        id: Number(id),
      },
    }).then((tag) => {
      if (tag !== null) return tag;
      throw new Error('Tag not found');
    });
  }
}
export default new TagController();
