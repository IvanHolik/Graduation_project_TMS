import axios from "axios"
import { ACCSESS_TOKEN } from "../constants/constants"

export interface paginatedArticleList {
    count: number,
    next: string | null,
    previous: string | null,
    results: IArticle[]
  }
  export interface IArticle {
      id: number,
      title: string,
      url: string,
      image_url: string,
      news_site: string,
      summary: string,
      published_at: string,
      updated_at: string,
      featured: boolean,
      launches: [
        {
          launch_id: string,
          provider: string
        },
        {
          launch_id: string,
          provider: string
        }
      ],
      events: [
        {
          event_id: number,
          provider: string
        }
      ]
  }

  export const articleAxios = axios.create({
    baseURL: 'https://api.spaceflightnewsapi.net/v4/articles/',
    headers: {
        'Content-Type': 'application/json',

    }
});

export const getArticles = async(params: string): Promise<paginatedArticleList> => {
    const response = await articleAxios.get(`?${params}`);
    // console.log(params)
    console.log(response.data)
    return response.data;
}
export const getArticle = async(id: number): Promise<IArticle> => {
    const response = await articleAxios.get(`${id}/`);
    // console.log(params)
    // console.log(response.data)
    return response.data;
}

export const createArticle = async(props: any): Promise<any> => {

  try{
    const response = await articleAxios.post("", 
    {
      props,
    }, {
        headers: {
            // "Authorization" : `Bearer ${localStorage.getItem(ACCSESS_TOKEN)}`,
            // "Content-Type": "multipart/form-data",
        },
    }
    );
    return response.data;
}catch(e) {
    if (axios.isAxiosError(e)) {
        alert(e)
    } else if (e instanceof Error) {
        alert(e.message)
        
    }
    return Promise.reject(e);
}
}

articleAxios.interceptors.request.use(
  (request) => {
      const accessToken = localStorage.getItem(ACCSESS_TOKEN);
      if (accessToken) {
          request.headers.setAuthorization(`Bearer ${accessToken}`);
      }
      return request;
  },
  (error) => {
      console.log(error.request.status)
      return Promise.reject(error);
  }
)
// export const crossArticlesPage = async (request: string) : Promise<paginatedArticleList> => {
//   const response = await axios.get(request,
//   {
//       headers: {
//           "Content-type" : "Application/json"
//       }
//   })
//   // console.log(params)
//   console.log(response.data)
//   return response.data;
// }
