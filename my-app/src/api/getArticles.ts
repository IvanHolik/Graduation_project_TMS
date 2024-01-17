import axios from "axios"

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

  export const paramsToString = (params: object): string => {
    const paramsArr = Object.entries(params);
    const result = paramsArr.reduce((res, param, i) => {
      if (i !== paramsArr.length - 1) {
        return res + encodeURIComponent(param[0]) + "=" + encodeURIComponent(param[1]) + "&";
      }else{
       return res + encodeURIComponent(param[0]) + "=" + encodeURIComponent(param[1]);
      }
    }, "")
    return result;
  }

export const getArticles = async(params: string): Promise<paginatedArticleList> => {
    const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?${params}`,
    {
        headers: {
            "Content-type" : "Application/json"
        }
    })
    // console.log(params)
    // console.log(response.data)
    return response.data;
}
export const getArticle = async(id: number): Promise<IArticle> => {
    const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/${id}/`,
    {
        headers: {
            "Content-type" : "Application/json"
        }
    })
    // console.log(params)
    // console.log(response.data)
    return response.data;
}

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
