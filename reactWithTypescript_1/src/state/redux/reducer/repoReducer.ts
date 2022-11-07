interface RepoState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initState: RepoState = {
  loading: false,
  error: null,
  data: [],
};

const repoReducer = (state: RepoState = initState, action: any): RepoState => {
  switch (action.type) {
    case "":
      return state;
    default:
      return state;
  }
};

export default repoReducer;
