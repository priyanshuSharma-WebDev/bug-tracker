const _ = require("lodash")
const updateUserProperty = (key,update) => {
    return _.extend(key,update)
}
module.exports =  updateUserProperty