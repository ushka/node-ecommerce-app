const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename) {
    if(!filename) {
      throw new Error('Need to provide a filename for a repository.')
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename)
    } catch(err) {
      fs.writeFileSync(this.filename, '[]')
    }
  }

  async getAll() {    
    return JSON.parse(
      await fs.promises.readFile(
        this.filename, { encoding: 'utf8'}
      )
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');
  
  await repo.create({
    email: 'test@test.com', 
    password: "mypassword", 
  });

  const users = await repo.getAll();
  
  console.log(users);
}

test();