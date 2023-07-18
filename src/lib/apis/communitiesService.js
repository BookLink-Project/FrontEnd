import { axiosJsonInstance } from './config/axios';

export const freeRegister = async (title, content) => {
  try {
    const { data } = await axiosJsonInstance.post(`/communities/board/free`, {
      title,
      content,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const reportRegister = async (
  title,
  content,
  book_title,
  authors,
  publisher,
  pud_date
) => {
  try {
    const { data } = await axiosJsonInstance.post(`/communities/board/report`, {
      title,
      contents: content,
      book_title,
      authors,
      publisher,
      pud_date,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const bookClubRegister = async (title, content, location) => {
  try {
    const { data, status } = await axiosJsonInstance.post(
      `/communities/book-club`,
      {
        title,
        content,
        location,
      }
    );
    console.log(data, status);
    return { data, status };
  } catch (error) {
    console.log(error.response);
  }
};

export const bookSearch = async (book_title) => {
  try {
    const { data: data1, status } = await axiosJsonInstance.get(
      `/books/aladdin/search?query=${book_title}`
    );

    const { data: data2 } = data1;
    const { item } = data2;
    console.log(item, status);
    return { item, status };
  } catch (error) {
    console.log(error.response);
  }
};