/**
 * @param {object} data RelationTree 完整的 value
 * @param {string} pos 位置字符串，形如：0_0_1
 * @param {string} type 操作类型，如：addTerm, addGroup, changeOps(改变逻辑运算符 &&、||), changeTerm, deleteTerm
 * @param {string} record 变更的单项值
 */
import _ from 'lodash'
export const getNewValue = (data = {}, pos = '', type, record) => {
    const arrPos = getArrPos(pos)
    const last = arrPos.length - 1
    let draft = _.cloneDeep(data)
    if (type !== 'changeOps' && !pos) {
        draft.children.push(record)
        return draft
    }
    let prev = { data: draft, idx: 0 }
    // 暂存遍历到的当前条件组的数据
    let current = draft.children || []
    // 根据 pos 遍历数据，pos 中的每一个数字代表它所在条件组的序号
    arrPos.forEach((strIdx, i) => {
        const idx = Number(strIdx)
        if (i === last) {
            console.log('current', arrPos, current)
            switch (type) {
                case 'addTerm':
                case 'addGroup': // 加条件或条件组,添加操作需要多一层children
                    current = (current[idx] && current[idx].children) || []
                    current.push(record)
                    break
                case 'deleteTerm': // 删除条件项
                    current.splice(idx, 1)
                    if (!current.length && Array.isArray(prev.data)) {
                        prev.data.splice(prev.idx, 1)
                    }
                    break
                case 'changeOps': // 变更逻辑连接符
                    current[idx][record.key] = record.value
                    break
                default: // 变更条件项内容
                    current[idx] = record
            }
        } else {
            // 将下一个条件组的数据复制到 current
            prev = { data: current, idx }
            current = (current[idx] && current[idx].children) || []
        }
    })
    //  })
    console.log('draft', draft)
    return draft
}

export const getArrPos = pos => {
    return (pos && pos.split(posSeparator)) || []
}

export const posSeparator = '_'