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
    return context.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id,
      }
    })
  }
};

module.exports = Mutation;