import axios from "axios";

class *Service {
  static postLog(data, onSuccess, onError) {
    const url =;
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }

  static retrievePageOfLogs(page, numberOfRows, onSuccess, onError) {
    const url =;
    const config = {
      method: "POST"
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }
*URL for the search query string that connected all three search boxes* 

  static searchedLogs(state, onSuccess, onError) {
    const url = `/filter?startdate=${state.dateStart}&enddate=${
      state.dateEnd
    }&levelType=${state.levelType}&skey=${state.searchBox}&sortBy=${
      state.sortBy
    }&sortOrder=${state.sortOrder}&page=${state.page}&rowOfLogs=${
      state.rowOfLogs
    }`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }

  static getAllLogs(onSuccess, onError) {
    const url = "/api/logs";
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }

  static getLogById(id, onSuccess, onError) {
    const url = `/api/logs/${id}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }

  static updateLog(id, data, onSuccess, onError) {
    const url = ;
    const config = {
      method: "PUT",
      data: data
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }

  static deleteLog(id, onSuccess, onError) {
    const url =;
    const config = {
      method: "DELETE"
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }

  static deleteAllLogs(onSuccess, onError) {
    const url =;
    const config = {
      method: "DELETE"
    };
    axios.defaults.withCredentials = true;
    axios(url, config)
      .then(onSuccess)
      .catch(onError);
  }
}

export default *Service;
