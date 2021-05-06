export default interface FetchableEntity {
  isLoading: boolean;

  isLoaded: boolean;
}

export const defaultFetchableEntity: FetchableEntity = {
  isLoading: false,

  isLoaded: false,
};
