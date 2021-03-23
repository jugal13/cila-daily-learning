async function getTodos({ commit }) {
  try {
    const result = await this.$axios(
      `https://jsonplaceholder.typicode.com/todos`
    );
    commit("updateTodos", result.data);
  } catch (error) {
    throw error;
  }
}

export { getTodos };
