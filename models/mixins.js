exports.pagination = (Model) => {
    Model.pagination = pagination;
};

async function pagination({ page = 1, limit = 1 } = {}, options = {}) {
    const [count, docs] = await Promise.all([
        this.count(options),
        this.findAll(Object.assign(options, {
            limit,
            offset: (page - 1) * limit,
        })),
    ]);
    const pages = Math.ceil(count / limit);

    return { pages, docs, page, count };
}