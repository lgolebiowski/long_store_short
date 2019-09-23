const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  async createItem(parent, args, context, info) {
    // TODO: Check if they are logged in

    const item = await context.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );

    console.log(item);

    return item;
  },

  async updateItem(parent, args, context, info) {
    // make a copy of the args
    const updates = {...args};
    // the id won't be updated - remove it 
    delete updates.id
    // call update
    return context.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, context, info) {
    const where = {id: args.id};
    // the id won't be updated - remove it 
    const item = context.db.query.item({ where }, `{ id title }`);
    // call update
    return context.db.mutation.deleteItem( 
      { where },
      info
    );
  },

  async signUp(parent, args, context, info) {
    console.log(args)
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 100 // 100 days
    });
    return user;
  }
}

module.exports = Mutation;