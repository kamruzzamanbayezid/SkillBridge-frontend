type ITutorParams = {
  search: string;
  categoryId: string;
  price: string;
  rating: string;
};

export const getTutors = async (params: ITutorParams) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutors?${query}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data.data;
};

export const getSingleTutor = async (id: string) => {
  console.log({ id });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutors/tutor-profile/${id}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  console.log({ data });
  return data.data;
};

export const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`);
  const data = await res.json();
  return data.data;
};
