import api from '../../../api';

const processFiles = async (files) => {

  const res = await Promise.all(files.map(async (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('File', file);
    bodyFormData.append('Name', file.name);
    api.defaults.headers['Content-Type'] = 'multipart/form-data';

    const { data } = await api.post('File/upload', bodyFormData);

    api.defaults.headers['Content-Type'] = 'application/json';

    return {
      id: data.data.id,
      name: file.name
    };
  }));
  return res;
};

export default processFiles;
