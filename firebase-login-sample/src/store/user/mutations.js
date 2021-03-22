function updateUser(state, data) {
  state.user = { ...data };
}

export { updateUser };
