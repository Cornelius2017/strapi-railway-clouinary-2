const slugify = require('slugify');

module.exports = {
    async beforeCreate(event) {
        const get_date = new Date(event.params.data.createdAt).toISOString().slice(0,10);
        const get_time = new Date().toISOString().slice(11,19).replaceAll(":", "-");
        event.params.data.uid = slugify('post-'+ get_date + "-" + get_time, {lower: true});
        console.log(event.params.data);
    },
    async beforeUpdate(event) {
        // const get_date = new Date(event.params.data.createdAt).toISOString();
        // const get_time = new Date().toISOString().slice(11,19).replaceAll(":", "-");
        // event.params.data.slug = slugify('post-'+ get_date + "-" + get_time, {lower: true});
    },
};