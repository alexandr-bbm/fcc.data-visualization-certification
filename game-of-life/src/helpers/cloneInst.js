export default function cloneInst (original) {
    return Object.assign(Object.create(original), original);
}