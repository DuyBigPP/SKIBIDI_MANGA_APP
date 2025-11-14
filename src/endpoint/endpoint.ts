export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://skibidi-manga-backend.onrender.com';

// Authentication
export const REGISTER_NEW_USER = `${BASE_URL}/api/auth/register`;  //POST
/*
Request body
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
Response body
{
  "success": true,
  "accessToken": "string",
  "refreshToken": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "role": "USER",
    "status": "ACTIVE",
    "avatar": "string"/null,
    "bio": "string"/null,
    "createdAt": "2025-11-14T11:16:37.666Z",
    "updatedAt": "2025-11-14T11:16:37.666Z",
    "lastLoginAt": "2025-11-14T11:16:37.666Z"/null
  }
}
*/

export const LOGIN_USER = `${BASE_URL}/api/auth/login`; //POST
/*
Request body
    {
        "email": "string",
        "password": "string"
    }
Response body
{
  "success": true,
  "accessToken": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "role": "USER",
    "status": "ACTIVE",
    "avatar": "string($binary)"/null,
    "bio": "string"/null,
    "createdAt": "2025-11-14T11:16:37.666Z",
    "updatedAt": "2025-11-14T11:16:37.666Z",
    "lastLoginAt": "2025-11-14T11:16:37.666Z"/null
  }
}
*/
export const LOGOUT_USER = `${BASE_URL}/api/auth/logout`; //POST
/*
Response body
{
  "success": true,
  "message": "Logged out successfully"
}
*/

export const USER_PROFILE = `${BASE_URL}/api/auth/me`; //GET
/*
Response body

  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "username": "string",
    "role": "USER",
    "status": "ACTIVE",
    "avatar": "string($binary)"/null,
    "bio": "string"/null,
    "createdAt": "2025-11-07T11:17:34.620Z",
    "lastLoginAt": "2025-11-14T11:22:02.362Z"/null
  }
}
*/  

export const UPDATE_USER_PROFILE = `${BASE_URL}/api/auth/profile`; //PUT
/*
Request body
    {
        "username": "string",
        "avatar": image("string($binary)"/null),
        "bio": "string"/null,
    }
Response body
{
  "success": true,
  "data": {
    "id": "string",
    "username": "string",
    "avatar": "string",
    "bio": "string"
  }
}
*/



//Manga
export const GET_ALL_MANGA = `${BASE_URL}/api/manga`; //GET (NO LOGIN REQUIRED)
/* 
parameters
    - page: interger (query)
    - limit: interger (query)
    - search: string (query)
    - status: string (query) (ONGOING, COMPLETED, HIATUS, CANCELLED)
    - genres: string (query)  (slug) 
    - author: string (query)  (slug)
    - sortBy: string (query) (createdAt, updatedAt, title)
    - order: string (query) (asc, desc)
Response body
{
  "success": true,
  "data": [
    {
      "id": "cmh221lj20001tmt8xrswei3q",
      "mangaId": null,
      "title": "TEST",
      "slug": "test",
      "alternativeTitles": [
        "TEST"
      ],
      "description": "TEST",
      "thumbnail": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141270/manga/covers/yhz8c3wl7zjgnkqogtl5.jpg",
      "coverImage": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141271/manga/covers/pe3oe1diouscpqmj7nzo.png",
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": 2025,
      "totalChapters": 1,
      "totalViews": 5,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": "cmh21v5d70000tmqguscsr4je",
      "createdAt": "2025-10-22T13:54:35.575Z",
      "updatedAt": "2025-11-12T10:05:25.098Z",
      "lastChapterAt": "2025-10-22T13:57:35.472Z",
      "authors": [
        {
          "id": "cmh221lj30002tmt8h9tiaqcy",
          "name": "ZuyBigPP",
          "slug": "zuybigpp"
        }
      ],
      "genres": [
        {
          "id": "cmh221lj30006tmt8j90lblvd",
          "name": "Test",
          "slug": "test"
        },
        {
          "id": "cmh21pk6e0014tmioiavb7uhl",
          "name": "Fantasy",
          "slug": "fantasy-1a0b4b"
        },
        {
          "id": "cmh21pk6e0013tmioir0mt3u7",
          "name": "Adventure",
          "slug": "adventure-95da5b"
        },
        {
          "id": "cmh21pk6e0012tmioz4ubg8g1",
          "name": "Action",
          "slug": "action-6eccbd"
        }
      ],
      "_count": {
        "chapters": 1,
        "bookmarks": 0,
        "comments": 0
      }
    },
    
*/

export const GET_TRENDING_MANGA = `${BASE_URL}/api/manga/trending`; //GET (NO LOGIN REQUIRED)
/* 
parameters
    limit: interger (query)
Response body
{
  "success": true,
  "data": [
    {
      "id": "cmh221lj20001tmt8xrswei3q",
      "mangaId": null,
      "title": "TEST",
      "slug": "test",
      "alternativeTitles": [
        "TEST"
      ],
      "description": "TEST",
      "thumbnail": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141270/manga/covers/yhz8c3wl7zjgnkqogtl5.jpg",
      "coverImage": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141271/manga/covers/pe3oe1diouscpqmj7nzo.png",
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": 2025,
      "totalChapters": 1,
      "totalViews": 5,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": "cmh21v5d70000tmqguscsr4je",
      "createdAt": "2025-10-22T13:54:35.575Z",
      "updatedAt": "2025-11-12T10:05:25.098Z",
      "lastChapterAt": "2025-10-22T13:57:35.472Z",
      "authors": [
        {
          "id": "cmh221lj30002tmt8h9tiaqcy",
          "name": "ZuyBigPP",
          "slug": "zuybigpp"
        }
      ],
      "genres": [
        {
          "id": "cmh221lj30006tmt8j90lblvd",
          "name": "Test",
          "slug": "test"
        },
        {
          "id": "cmh21pk6e0014tmioiavb7uhl",
          "name": "Fantasy",
          "slug": "fantasy-1a0b4b"
        },
        {
          "id": "cmh21pk6e0013tmioir0mt3u7",
          "name": "Adventure",
          "slug": "adventure-95da5b"
        },
        {
          "id": "cmh21pk6e0012tmioz4ubg8g1",
          "name": "Action",
          "slug": "action-6eccbd"
        }
      ]
    },
*/

export const GET_RECENTLY_UPDATED_MANGA = `${BASE_URL}/api/manga/recent`; //GET (NO LOGIN REQUIRED)
/* 
parameters
    limit: interger (query)
Response body
{
  "success": true,
  "data": [
    {
      "id": "cmh221lj20001tmt8xrswei3q",
      "mangaId": null,
      "title": "TEST",
      "slug": "test",
      "alternativeTitles": [
        "TEST"
      ],
      "description": "TEST",
      "thumbnail": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141270/manga/covers/yhz8c3wl7zjgnkqogtl5.jpg",
      "coverImage": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141271/manga/covers/pe3oe1diouscpqmj7nzo.png",
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": 2025,
      "totalChapters": 1,
      "totalViews": 5,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": "cmh21v5d70000tmqguscsr4je",
      "createdAt": "2025-10-22T13:54:35.575Z",
      "updatedAt": "2025-11-12T10:05:25.098Z",
      "lastChapterAt": "2025-10-22T13:57:35.472Z",
      "authors": [
        {
          "id": "cmh221lj30002tmt8h9tiaqcy",
          "name": "ZuyBigPP",
          "slug": "zuybigpp"
        }
      ],
      "genres": [
        {
          "id": "cmh221lj30006tmt8j90lblvd",
          "name": "Test",
          "slug": "test"
        },
        {
          "id": "cmh21pk6e0014tmioiavb7uhl",
          "name": "Fantasy",
          "slug": "fantasy-1a0b4b"
        },
        {
          "id": "cmh21pk6e0013tmioir0mt3u7",
          "name": "Adventure",
          "slug": "adventure-95da5b"
        },
        {
          "id": "cmh21pk6e0012tmioz4ubg8g1",
          "name": "Action",
          "slug": "action-6eccbd"
        }
      ],
      "latestChapter": {
        "chapterNumber": 1,
        "title": "Chapter 1: The TEST",
        "publishedAt": "2025-10-22T13:57:35.218Z"
      }
    }
}
*/

export const GET_ONE_RANDOM_MANGA = `${BASE_URL}/api/manga/random`; //GET(NO LOGIN REQUIRED)
/* 
parameters
    limit: 1
Response body
{
  "success": true,
  "data": [
    {
      "id": "cmh21sl8601h7tmioq2pqbmy6",
      "mangaId": "416010",
      "title": "The Regressed Mercenary's Machinations",
      "slug": "the-regressed-mercenarys-machinations-2d6399",
      "alternativeTitles": [
        "The Regressed Mercenary's Machinations",
        "The Regressed Mercenary Has a Plan",
        "Every Returned Mercenary Has a Plan",
        "회귀한 용병은 다 계획이 있다",
        "Gold Line",
        "Park JinSeok"
      ],
      "description": "Ghislain Perdium, the Mercenary King and one of the continent's top seven started a great war in an attempt to avenge his fallen family. His plans of revenge were going smoothly until he was slain by Idun, who he had never expected to make an appearance. Ghislain thought he died, but he woke up as a younger version of himself from before the fall of his household. With this second chance, he decided to fix all the wrong pieces of the puzzle and avoid making the same mistakes he did in his past life!. Unofficial translation. Brought to you by Regression Asura Comics.",
      "thumbnail": "https://mangapark.org/thumb/W600/mpim/480/480b927c9da12561fbc89b98277977619acc393d_330_485_43106.webp",
      "coverImage": null,
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": null,
      "totalChapters": 58,
      "totalViews": 0,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": null,
      "createdAt": "2025-10-22T13:47:35.669Z",
      "updatedAt": "2025-10-22T13:47:35.669Z",
      "lastChapterAt": "2025-10-22T13:47:35.663Z",
      "authors": [
        {
          "id": "cmh21sl8601h8tmiosm8l6983",
          "name": "Every Returned Mercenary Has a Plan",
          "slug": "every-returned-mercenary-has-a-plan-aa7e7b"
        },
        {
          "id": "cmh21sl8601hbtmiotw8l3v2m",
          "name": "Park JinSeok",
          "slug": "park-jinseok-eed4d3"
        },
        {
          "id": "cmh21sl8601hatmioohr37egb",
          "name": "Gold Line",
          "slug": "gold-line-35aae8"
        },
        {
          "id": "cmh21sl8601h9tmiozrobcl6k",
          "name": "회귀한 용병은 다 계획이 있다",
          "slug": "-c911b0"
        }
      ],
      "genres": [
        {
          "id": "cmh21qpuw00qbtmio8tlxc71z",
          "name": "Regression",
          "slug": "regression-f56dc7"
        },
        {
          "id": "cmh21phw9000otmiobpcz1hgi",
          "name": "Life",
          "slug": "life-8a1236"
        },
        {
          "id": "cmh21r8p300xxtmio42sxja53",
          "name": "War",
          "slug": "war-05b295"
        },
        {
          "id": "cmh21ppx4001ytmio0uvppz51",
          "name": "Time Travel",
          "slug": "time-travel-41eee2"
        },
        {
          "id": "cmh21qbpd00ivtmio66wedz9s",
          "name": "Seinen",
          "slug": "seinen-b97717"
        },
        {
          "id": "cmh21pk6e0014tmioiavb7uhl",
          "name": "Fantasy",
          "slug": "fantasy-1a0b4b"
        },
        {
          "id": "cmh21pk6e0013tmioir0mt3u7",
          "name": "Adventure",
          "slug": "adventure-95da5b"
        },
        {
          "id": "cmh21pk6e0012tmioz4ubg8g1",
          "name": "Action",
          "slug": "action-6eccbd"
        },
        {
          "id": "cmh21ppx4001ztmio2smpnl2m",
          "name": "Webtoon",
          "slug": "webtoon-27ca6e"
        },
        {
          "id": "cmh21pk6e0011tmiohgw3ba14",
          "name": "Manhwa",
          "slug": "manhwa-b4f101"
        }
      ],
      "_count": {
        "chapters": 58,
        "bookmarks": 0,
        "comments": 0
      }
    }
  ]
}
*/


export const GET_MANGA_BY_SLUG = `${BASE_URL}/api/manga/{slug}`; //GET (FULL DETAILS) (NO LOGIN REQUIRED)
/*
parameters
    slug: string (path) (example: the-regressed-mercenarys-machinations-2d6399)
Response body
{
  "success": true,
  "data": {
    "id": "cmh21sl8601h7tmioq2pqbmy6",
    "mangaId": "416010",
    "title": "The Regressed Mercenary's Machinations",
    "slug": "the-regressed-mercenarys-machinations-2d6399",
    "alternativeTitles": [
      "The Regressed Mercenary's Machinations",
      "The Regressed Mercenary Has a Plan",
      "Every Returned Mercenary Has a Plan",
      "회귀한 용병은 다 계획이 있다",
      "Gold Line",
      "Park JinSeok"
    ],
    "description": "Ghislain Perdium, the Mercenary King and one of the continent's top seven started a great war in an attempt to avenge his fallen family. His plans of revenge were going smoothly until he was slain by Idun, who he had never expected to make an appearance. Ghislain thought he died, but he woke up as a younger version of himself from before the fall of his household. With this second chance, he decided to fix all the wrong pieces of the puzzle and avoid making the same mistakes he did in his past life!. Unofficial translation. Brought to you by Regression Asura Comics.",
    "thumbnail": "https://mangapark.org/thumb/W600/mpim/480/480b927c9da12561fbc89b98277977619acc393d_330_485_43106.webp",
    "coverImage": null,
    "status": "ONGOING",
    "approvalStatus": "APPROVED",
    "releaseYear": null,
    "totalChapters": 58,
    "totalViews": 0,
    "totalBookmarks": 0,
    "averageRating": 0,
    "totalRatings": 0,
    "uploaderId": null,
    "createdAt": "2025-10-22T13:47:35.669Z",
    "updatedAt": "2025-10-22T13:47:35.669Z",
    "lastChapterAt": "2025-10-22T13:47:35.663Z",
    "authors": [
      {
        "id": "cmh21sl8601h8tmiosm8l6983",
        "name": "Every Returned Mercenary Has a Plan",
        "slug": "every-returned-mercenary-has-a-plan-aa7e7b",
        "bio": null,
        "avatar": null,
        "createdAt": "2025-10-22T13:47:35.669Z",
        "updatedAt": "2025-10-22T13:47:35.669Z"
      },
      {
        "id": "cmh21sl8601hbtmiotw8l3v2m",
        "name": "Park JinSeok",
        "slug": "park-jinseok-eed4d3",
        "bio": null,
        "avatar": null,
        "createdAt": "2025-10-22T13:47:35.669Z",
        "updatedAt": "2025-10-22T13:47:35.669Z"
      },
      {
        "id": "cmh21sl8601hatmioohr37egb",
        "name": "Gold Line",
        "slug": "gold-line-35aae8",
        "bio": null,
        "avatar": null,
        "createdAt": "2025-10-22T13:47:35.669Z",
        "updatedAt": "2025-10-22T13:47:35.669Z"
      },
      {
        "id": "cmh21sl8601h9tmiozrobcl6k",
        "name": "회귀한 용병은 다 계획이 있다",
        "slug": "-c911b0",
        "bio": null,
        "avatar": null,
        "createdAt": "2025-10-22T13:47:35.669Z",
        "updatedAt": "2025-10-22T13:47:35.669Z"
      }
    ],
    "genres": [
      {
        "id": "cmh21qpuw00qbtmio8tlxc71z",
        "name": "Regression",
        "slug": "regression-f56dc7",
        "description": null,
        "createdAt": "2025-10-22T13:46:08.358Z",
        "updatedAt": "2025-10-22T13:46:08.358Z"
      },
      {
        "id": "cmh21phw9000otmiobpcz1hgi",
        "name": "Life",
        "slug": "life-8a1236",
        "description": null,
        "createdAt": "2025-10-22T13:45:11.385Z",
        "updatedAt": "2025-10-22T13:45:11.385Z"
      },
      {
        "id": "cmh21r8p300xxtmio42sxja53",
        "name": "War",
        "slug": "war-05b295",
        "description": null,
        "createdAt": "2025-10-22T13:46:32.772Z",
        "updatedAt": "2025-10-22T13:46:32.772Z"
      },
      {
        "id": "cmh21ppx4001ytmio0uvppz51",
        "name": "Time Travel",
        "slug": "time-travel-41eee2",
        "description": null,
        "createdAt": "2025-10-22T13:45:21.777Z",
        "updatedAt": "2025-10-22T13:45:21.777Z"
      },
      {
        "id": "cmh21qbpd00ivtmio66wedz9s",
        "name": "Seinen",
        "slug": "seinen-b97717",
        "description": null,
        "createdAt": "2025-10-22T13:45:50.015Z",
        "updatedAt": "2025-10-22T13:45:50.015Z"
      },
      {
        "id": "cmh21pk6e0014tmioiavb7uhl",
        "name": "Fantasy",
        "slug": "fantasy-1a0b4b",
        "description": null,
        "createdAt": "2025-10-22T13:45:14.339Z",
        "updatedAt": "2025-10-22T13:45:14.339Z"
      },
      {
        "id": "cmh21pk6e0013tmioir0mt3u7",
        "name": "Adventure",
        "slug": "adventure-95da5b",
        "description": null,
        "createdAt": "2025-10-22T13:45:14.339Z",
        "updatedAt": "2025-10-22T13:45:14.339Z"
      },
      {
        "id": "cmh21pk6e0012tmioz4ubg8g1",
        "name": "Action",
        "slug": "action-6eccbd",
        "description": null,
        "createdAt": "2025-10-22T13:45:14.339Z",
        "updatedAt": "2025-10-22T13:45:14.339Z"
      },
      {
        "id": "cmh21ppx4001ztmio2smpnl2m",
        "name": "Webtoon",
        "slug": "webtoon-27ca6e",
        "description": null,
        "createdAt": "2025-10-22T13:45:21.777Z",
        "updatedAt": "2025-10-22T13:45:21.777Z"
      },
      {
        "id": "cmh21pk6e0011tmiohgw3ba14",
        "name": "Manhwa",
        "slug": "manhwa-b4f101",
        "description": null,
        "createdAt": "2025-10-22T13:45:14.339Z",
        "updatedAt": "2025-10-22T13:45:14.339Z"
      }
    ],
    "chapters": [
      {
        "id": "cmh21sl8701hmtmioju567kwd",
        "chapterNumber": 0,
        "title": "",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-0",
        "totalImages": 0,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8a01j7tmiozuuqr7ld",
        "chapterNumber": 1,
        "title": "Chapter 1",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-1",
        "totalImages": 19,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8a01j6tmio2ixqr31o",
        "chapterNumber": 2,
        "title": "Chapter 2",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-2",
        "totalImages": 17,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8a01j5tmionzimjpph",
        "chapterNumber": 3,
        "title": "Chapter 3",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-3",
        "totalImages": 15,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8a01j4tmiodvnvgveo",
        "chapterNumber": 4,
        "title": "Chapter 4",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-4",
        "totalImages": 13,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8a01j3tmiovs3qk3nc",
        "chapterNumber": 5,
        "title": "Chapter 5",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-5",
        "totalImages": 13,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901j2tmio2em2it21",
        "chapterNumber": 6,
        "title": "Chapter 6",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-6",
        "totalImages": 15,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901j1tmio6gij0jnc",
        "chapterNumber": 7,
        "title": "Chapter 7",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-7",
        "totalImages": 15,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901j0tmiorr4w1ngl",
        "chapterNumber": 8,
        "title": "Chapter 8",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-8",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iztmiohz0jlosq",
        "chapterNumber": 9,
        "title": "Chapter 9",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-9",
        "totalImages": 15,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iytmioya556m6q",
        "chapterNumber": 10,
        "title": "Chapter 10",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-10",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901ixtmioc7o7tyj1",
        "chapterNumber": 11,
        "title": "Chapter 11",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-11",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iwtmiot3n0nrlr",
        "chapterNumber": 12,
        "title": "Chapter 12",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-12",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901ivtmioav6y9kri",
        "chapterNumber": 13,
        "title": "Chapter 13",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-13",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iutmio1krwonoy",
        "chapterNumber": 14,
        "title": "Chapter 14",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-14",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901ittmiodujgtryt",
        "chapterNumber": 15,
        "title": "Chapter 15",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-15",
        "totalImages": 44,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901istmio3g42isf9",
        "chapterNumber": 16,
        "title": "Chapter 16",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-16",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901irtmiop31xkhit",
        "chapterNumber": 17,
        "title": "Chapter 17",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-17",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iqtmio0rx1r6t5",
        "chapterNumber": 18,
        "title": "Chapter 18",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-18",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iptmiovcbt6f7u",
        "chapterNumber": 19,
        "title": "Chapter 19",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-19",
        "totalImages": 13,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iotmiouyxf8acv",
        "chapterNumber": 20,
        "title": "Chapter 20",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-20",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901intmiompnwv99b",
        "chapterNumber": 21,
        "title": "Chapter 21",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-21",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901imtmiok4nvcvod",
        "chapterNumber": 22,
        "title": "Chapter 22",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-22",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iltmio0rheyhpv",
        "chapterNumber": 23,
        "title": "Chapter 23",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-23",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iktmioep3p20nj",
        "chapterNumber": 24,
        "title": "Chapter 24",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-24",
        "totalImages": 9,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901ijtmiodv5jrl35",
        "chapterNumber": 25,
        "title": "Chapter 25",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-25",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8901iitmiouaw4t4ga",
        "chapterNumber": 26,
        "title": "Chapter 26",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-26",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801ihtmiojnan12wu",
        "chapterNumber": 27,
        "title": "Chapter 27",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-27",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801igtmio2zi3r927",
        "chapterNumber": 28,
        "title": "Chapter 28",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-28",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801iftmiodshwsn7p",
        "chapterNumber": 29,
        "title": "Chapter 29",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-29",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801ietmio02a7ljbw",
        "chapterNumber": 30,
        "title": "Chapter 30",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-30",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801idtmiorwghqn04",
        "chapterNumber": 31,
        "title": "Chapter 31",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-31",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801ictmiox2e3kcis",
        "chapterNumber": 32,
        "title": "Chapter 32",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-32",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801ibtmioiev3ab7h",
        "chapterNumber": 33,
        "title": "Chapter 33",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-33",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801iatmioe23o50s5",
        "chapterNumber": 34,
        "title": "Chapter 34",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-34",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i9tmiob7ti43se",
        "chapterNumber": 35,
        "title": "Chapter 35",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-35",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i8tmiosf4zs0he",
        "chapterNumber": 36,
        "title": "Chapter 36",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-36",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i7tmiogu2pswqq",
        "chapterNumber": 37,
        "title": "Chapter 37",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-37",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i6tmiodbpqdozp",
        "chapterNumber": 38,
        "title": "Chapter 38",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-38",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i5tmioxy6j1fc3",
        "chapterNumber": 39,
        "title": "Chapter 39",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-39",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i4tmioxgnkwhvr",
        "chapterNumber": 40,
        "title": "Chapter 40",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-40",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i3tmio2jyc4033",
        "chapterNumber": 41,
        "title": "Chapter 41",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-41",
        "totalImages": 16,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i2tmiofjk9z3nq",
        "chapterNumber": 42,
        "title": "Chapter 42",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-42",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i1tmio7wx96jsn",
        "chapterNumber": 43,
        "title": "Chapter 43",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-43",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hztmiocn0ajp66",
        "chapterNumber": 44,
        "title": "Chapter 44",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-44",
        "totalImages": 15,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801i0tmiofaj314s8",
        "chapterNumber": 45,
        "title": "Chapter 45",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-45",
        "totalImages": 10,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hytmioe8ysu091",
        "chapterNumber": 46,
        "title": "Chapter 46",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-46",
        "totalImages": 11,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hxtmioory1uv7s",
        "chapterNumber": 47,
        "title": "Chapter 47",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-47",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hwtmiocs71jsjh",
        "chapterNumber": 48,
        "title": "Chapter 48",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-48",
        "totalImages": 13,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hvtmiouiib33v1",
        "chapterNumber": 49,
        "title": "Chapter 49",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-49",
        "totalImages": 16,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hutmio1bv9omya",
        "chapterNumber": 50,
        "title": "Chapter 50",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-50",
        "totalImages": 13,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801httmiofl7s149s",
        "chapterNumber": 51,
        "title": "Chapter 51",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-51",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hstmioog6cior1",
        "chapterNumber": 52,
        "title": "Chapter 52",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-52",
        "totalImages": 13,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hrtmio8331o937",
        "chapterNumber": 53,
        "title": "Chapter 53",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-53",
        "totalImages": 19,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hqtmio80jfsxq1",
        "chapterNumber": 54,
        "title": "Chapter 54",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-54",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hptmiot8k5y4mb",
        "chapterNumber": 55,
        "title": "Chapter 55  [AsuraScans]",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-55",
        "totalImages": 12,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8801hotmiofzole38t",
        "chapterNumber": 56,
        "title": "Chapter 56",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-56",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      },
      {
        "id": "cmh21sl8701hntmiod47dwjla",
        "chapterNumber": 57,
        "title": "Chapter 57",
        "slug": "the-regressed-mercenarys-machinations-2d6399-ch-57",
        "totalImages": 14,
        "totalViews": 0,
        "publishedAt": "2025-10-22T13:47:35.663Z"
      }
    ],
    "_count": {
      "bookmarks": 0,
      "comments": 0,
      "ratings": 0
    }
  }
}
*/ 



//Chapter
export const GET_CHAPTER_BY_SLUG = `${BASE_URL}/api/chapters/{slug}`; //GET (NO LOGIN REQUIRED)
/*
parameters
    slug: string (path) (example: the-regressed-mercenarys-machinations-2d6399-ch-57)
response body
{
  "success": true,
  "data": {
    "id": "cmh21sl8a01j3tmiovs3qk3nc",
    "chapterId": null,
    "mangaId": "cmh21sl8601h7tmioq2pqbmy6",
    "chapterNumber": 5,
    "title": "Chapter 5",
    "slug": "the-regressed-mercenarys-machinations-2d6399-ch-5",
    "images": [
      "https://s10.mpfip.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538329_800_15072_2100668.webp",
      "https://s10.mpvim.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538330_800_15072_2445534.webp",
      "https://s01.mpubn.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538331_800_14736_2151530.webp",
      "https://s09.mpvim.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538337_800_14747_1955116.webp",
      "https://s04.mpvim.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538332_800_14040_2341864.webp",
      "https://s10.mpypl.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538335_800_14301_2125616.webp",
      "https://s10.mpfip.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538333_800_12997_1884826.webp",
      "https://s00.mpujj.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538336_800_15072_2177018.webp",
      "https://s07.mprnm.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538338_800_14585_1939510.webp",
      "https://s02.mpizz.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538339_800_14400_1940966.webp",
      "https://s08.mpqsc.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538340_800_15072_1827840.webp",
      "https://s09.mpvim.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538341_800_13171_1710382.webp",
      "https://s09.mpujj.org/media/mpup/1b6/66f2e535081e2cffb75526b1/1538342_800_7058_1137472.webp"
    ],
    "totalImages": 13,
    "status": "PUBLISHED",
    "totalViews": 0,
    "createdAt": "2025-10-22T13:47:35.669Z",
    "updatedAt": "2025-10-22T13:47:35.669Z",
    "publishedAt": "2025-10-22T13:47:35.663Z",
    "manga": {
      "id": "cmh21sl8601h7tmioq2pqbmy6",
      "title": "The Regressed Mercenary's Machinations",
      "slug": "the-regressed-mercenarys-machinations-2d6399",
      "thumbnail": "https://mangapark.org/thumb/W600/mpim/480/480b927c9da12561fbc89b98277977619acc393d_330_485_43106.webp"
    }
  }
}
*/


export const GET_ALL_CHAPTER_FOR_A_MANGA = `${BASE_URL}/api/manga/{mangaId}/chapters`; //GET (NO LOGIN REQUIRED)
/*
parameters
    mangaId: string (path) (example: cmh21sl8601h7tmioq2pqbmy6)
    sortBy: string (query) (chapterNumber)
    order: string (query) (asc, desc)
Response body
{
  "success": true,
  "data": [
    {
      "id": "cmh21sl8701hntmiod47dwjla",
      "chapterNumber": 57,
      "title": "Chapter 57",
      "slug": "the-regressed-mercenarys-machinations-2d6399-ch-57",
      "totalImages": 14,
      "totalViews": 0,
      "publishedAt": "2025-10-22T13:47:35.663Z",
      "createdAt": "2025-10-22T13:47:35.669Z"
    },
    {
      "id": "cmh21sl8801hotmiofzole38t",
      "chapterNumber": 56,
      "title": "Chapter 56",
      "slug": "the-regressed-mercenarys-machinations-2d6399-ch-56",
      "totalImages": 14,
      "totalViews": 0,
      "publishedAt": "2025-10-22T13:47:35.663Z",
      "createdAt": "2025-10-22T13:47:35.669Z"
    },
 ....
}
*/ 



//Author
export const GET_ALL_AUTHORS = `${BASE_URL}/api/authors`; //GET (NO LOGIN REQUIRED)
/*
parameters
    page: interger (query)(optional, returns all if not provided)
    limit: interger (query)(optional)
    search: string (query) (by name)
response body
{
  "success": true,
  "data": [
    {
      "id": "cmh21t58401pxtmio23o8vy5m",
      "name": "+tic Neesan",
      "slug": "tic-neesan-2bb448",
      "bio": null,
      "avatar": null,
      "createdAt": "2025-10-22T13:48:01.587Z",
      "updatedAt": "2025-10-22T13:48:01.587Z",
      "_count": {
        "mangas": 1
      }
    },
    {
      "id": "cmh21sw4u01mztmio3aefk5a2",
      "name": "Academy Player-reul Jugyeotda",
      "slug": "academy-player-reul-jugyeotda-b1b3ee",
      "bio": null,
      "avatar": null,
      "createdAt": "2025-10-22T13:47:49.801Z",
      "updatedAt": "2025-10-22T13:47:49.801Z",
      "_count": {
        "mangas": 1
      }
    },
    {
      "id": "cmh21r0jv00w1tmioy46r51ap",
      "name": "An Archdemon's Dilemma: How to Love Your Elf Bride",
      "slug": "an-archdemons-dilemma-how-to-love-your-elf-bride-00fb14",
      "bio": null,
      "avatar": null,
      "createdAt": "2025-10-22T13:46:22.218Z",
      "updatedAt": "2025-10-22T13:46:22.218Z",
      "_count": {
        "mangas": 1
      }
    },
    {
      "id": "cmh21t58401q1tmio3a8qygyq",
      "name": "Cha Kurii",
      "slug": "cha-kurii-1e0f36",
      "bio": null,
      "avatar": null,
      "createdAt": "2025-10-22T13:48:01.587Z",
      "updatedAt": "2025-10-22T13:48:01.587Z",
      "_count": {
        "mangas": 1
      }
    },
    {
      "id": "cmh21py45009ftmioqaxi77af",
      "name": "Changpan Yongzhe",
      "slug": "changpan-yongzhe-4ec67a",
      "bio": null,
      "avatar": null,
      "createdAt": "2025-10-22T13:45:32.400Z",
      "updatedAt": "2025-10-22T13:45:32.400Z",
      "_count": {
        "mangas": 1
      }
    },
    ...
  ]
}
*/

export const GET_AUTHOR_DETAIL_BY_SLUG = `${BASE_URL}/api/authors/{slug}`; //GET (NO LOGIN REQUIRED)
/*
parameters
    slug: string (path) (example: tic-neesan-2bb448)
response body
{
  "success": true,
  "data": {
    "id": "cmh21t58401q1tmio3a8qygyq",
    "name": "Cha Kurii",
    "slug": "cha-kurii-1e0f36",
    "bio": null,
    "avatar": null,
    "createdAt": "2025-10-22T13:48:01.587Z",
    "updatedAt": "2025-10-22T13:48:01.587Z",
    "_count": {
      "mangas": 1
    }
  }
}

*/

export const GET_ALL_MANGA_BY_AUTHOR_SLUG = `${BASE_URL}/api/authors/{slug}/manga`; //GET (NO LOGIN REQUIRED)
/*
parameters
    slug: string (path) (example: tic-neesan-2bb448)
    page: interger (query)
    limit: interger (query)
    sortBy: string (query) (createdAt, updatedAt, title)
    order: string (query) (asc, desc)
response body
{
  "success": true,
  "author": {
    "id": "cmh21t58401pxtmio23o8vy5m",
    "name": "+tic Neesan",
    "slug": "tic-neesan-2bb448",
    "bio": null,
    "avatar": null,
    "createdAt": "2025-10-22T13:48:01.587Z",
    "updatedAt": "2025-10-22T13:48:01.587Z"
  },
  "manga": [
    {
      "id": "cmh21t58301pvtmioatqttyyd",
      "mangaId": "24216",
      "title": "+tic Elder Sister",
      "slug": "tic-elder-sister-180ba3",
      "alternativeTitles": [
        "+tic Elder Sister",
        "＋チック姉さん",
        "Plastic Neesan",
        "+tic Neesan",
        "Plastic Elder Sister",
        "Plastic Nee-san",
        "Young Gangan",
        "Cha Kurii",
        "栗井 茶"
      ],
      "description": "The story follows a third-year high school girl (Neesan) who likes building plastic models in a model-making club along with fellow club members Makimaki and Okappa.\n\n\n\n(Source: MU). \n\n\nPublishers:\nYoung Gangan (magazine)",
      "thumbnail": "https://mangapark.org/thumb/W600/amim/94d/6044d339cef5fd203f6c3d49_225_320_35049.jpg",
      "coverImage": null,
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": null,
      "totalChapters": 36,
      "totalViews": 0,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": null,
      "createdAt": "2025-10-22T13:48:01.587Z",
      "updatedAt": "2025-10-22T13:48:01.587Z",
      "lastChapterAt": "2025-10-22T13:48:01.583Z",
      "authors": [
        {
          "id": "cmh21t58301pwtmiooab2ehgt",
          "name": "Plastic Neesan",
          "slug": "plastic-neesan-f95cb7"
        },
        {
          "id": "cmh21t58401q2tmioddr2kgst",
          "name": "栗井 茶",
          "slug": "-4b923a"
        },
        {
          "id": "cmh21t58401q1tmio3a8qygyq",
          "name": "Cha Kurii",
          "slug": "cha-kurii-1e0f36"
        },
        {
          "id": "cmh21t58401q0tmiobx7gpi85",
          "name": "Young Gangan",
          "slug": "young-gangan-2ce34c"
        },
        {
          "id": "cmh21t58401pztmioraelrg01",
          "name": "Plastic Nee-san",
          "slug": "plastic-nee-san-356445"
        },
        {
          "id": "cmh21t58401pytmiozz0lq52v",
          "name": "Plastic Elder Sister",
          "slug": "plastic-elder-sister-7d2899"
        },
        {
          "id": "cmh21t58401pxtmio23o8vy5m",
          "name": "+tic Neesan",
          "slug": "tic-neesan-2bb448"
        }
      ],
      "genres": [
        {
          "id": "cmh21phw9000ntmio2i475yqi",
          "name": "School",
          "slug": "school-f521e6"
        },
        {
          "id": "cmh21qbpd00ivtmio66wedz9s",
          "name": "Seinen",
          "slug": "seinen-b97717"
        },
        {
          "id": "cmh21ppx40023tmio8rh54098",
          "name": "Slice Of Life",
          "slug": "slice-of-life-addc05"
        },
        {
          "id": "cmh21pdz90004tmioj67okzcg",
          "name": "Comedy",
          "slug": "comedy-c8dd0e"
        }
      ],
      "_count": {
        "chapters": 36,
        "bookmarks": 0
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
*/


//Bookmark
export const GET_ALL_BOOKMARKED_MANGA = `${BASE_URL}/api/bookmarks`; //GET
/*
parameters
    page: interger (query)
    limit: interger (query)
    sortBy: string (query) (createdAt, updatedAt)
    order: string (query) (asc, desc)
response body
{
  "success": true,
  "data": [
    {
      "id": "cmhorzi1x0001tm6w5q8y4a3c",
      "userId": "cmhorhan00000tmp47bc8me7s",
      "mangaId": "cmh21q3yw00e2tmioxgp7v2ac",
      "createdAt": "2025-11-07T11:31:44.038Z",
      "updatedAt": "2025-11-07T11:31:44.038Z",
      "manga": {
        "id": "cmh21q3yw00e2tmioxgp7v2ac",
        "mangaId": "409855",
        "title": "My Inventory Is Abnormal",
        "slug": "my-inventory-is-abnormal-c9c290",
        "alternativeTitles": [
          "My Inventory Is Abnormal",
          "내 인벤토리가 이상하다",
          "Sigyeyeol",
          "Miro (Ii)"
        ],
        "description": "The game has turned into reality and a “Great Migration” has occurred all over the Earth. As a top-tier ranker thanks to massive in-game purchases, along with the special privileges from the game administrator “Nel,” I got a new lease on life. I even inherited the inventory of my max-level game character as it was prior to the game shutting down. From cash items that no one else can acquire, to special items of legendary grade that everyone desires! Now, everything that everyone wants unfolds infinitely within my inventory. Please, let it be known to only you! My inventory is… abnormal..",
        "thumbnail": "https://mangapark.org/thumb/W600/ampi/b93/b93bdcb7bee53bac251d747563994a0b8f9a0e94_225_321_130941.jpeg",
        "coverImage": null,
        "status": "ONGOING",
        "approvalStatus": "APPROVED",
        "releaseYear": null,
        "totalChapters": 44,
        "totalViews": 0,
        "totalBookmarks": 0,
        "averageRating": 0,
        "totalRatings": 0,
        "uploaderId": null,
        "createdAt": "2025-10-22T13:45:39.991Z",
        "updatedAt": "2025-10-22T13:45:39.991Z",
        "lastChapterAt": "2025-10-22T13:45:39.977Z",
        "authors": [
          {
            "id": "cmh21q3yw00e3tmiopvmn4jfl",
            "name": "Sigyeyeol",
            "slug": "sigyeyeol-953830"
          },
          {
            "id": "cmh21q3yw00e4tmio74sfs6y1",
            "name": "Miro (Ii)",
            "slug": "miro-ii-33057e"
          }
        ],
        "genres": [
          {
            "id": "cmh21phw9000otmiobpcz1hgi",
            "name": "Life",
            "slug": "life-8a1236"
          },
          {
            "id": "cmh21pdz90007tmioyn5cmrvs",
            "name": "Shounen",
            "slug": "shounen-24c678"
          },
          {
            "id": "cmh21pk6e0014tmioiavb7uhl",
            "name": "Fantasy",
            "slug": "fantasy-1a0b4b"
          },
          {
            "id": "cmh21pk6e0013tmioir0mt3u7",
            "name": "Adventure",
            "slug": "adventure-95da5b"
          },
          {
            "id": "cmh21pk6e0012tmioz4ubg8g1",
            "name": "Action",
            "slug": "action-6eccbd"
          }
        ],
        "_count": {
          "chapters": 44,
          "bookmarks": 1,
          "comments": 0
        }
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
*/

export const CHECK_IF_MANGA_IS_BOOKMARKED = `${BASE_URL}/api/bookmarks/check/{mangaId}`; //GET
/*
parameters
    mangaId: string (path) (example: cmh21q3yw00e2tmioxgp7v2ac)
response body
{
  "success": true,
  "data": {
    "isBookmarked": true,
    "bookmarkId": "cmhorzi1x0001tm6w5q8y4a3c"
  }
}
*/

export const TOGGLE_BOOKMARK_FOR_A_MANGA = `${BASE_URL}/api/bookmarks/toggle/{mangaId}`; //POST
/*
parameters
    mangaId: string (path) (example: cmh21q3yw00e2tmioxgp7v2ac)
response body
{
  "success": true,
  "data": {
    "action": "added",
    "isBookmarked": true
  },
  "message": "Manga added to bookmarks"/"Manga removed from bookmarks"
}
*/



//Genre
export const GET_ALL_GENRES = `${BASE_URL}/api/genres`; //GET (NO LOGIN REQUIRED)
/*
response body

  "success": true,
  "data": [
    {
      "id": "cmh21pk6e0012tmioz4ubg8g1",
      "name": "Action",
      "slug": "action-6eccbd",
      "description": null,
      "createdAt": "2025-10-22T13:45:14.339Z",
      "updatedAt": "2025-10-22T13:45:14.339Z",
      "_count": {
        "mangas": 23
      }
    },
    {
      "id": "cmh21qbpd00ixtmioe1w7pjnd",
      "name": "Adult",
      "slug": "adult-fee436",
      "description": null,
      "createdAt": "2025-10-22T13:45:50.015Z",
      "updatedAt": "2025-10-22T13:45:50.015Z",
      "_count": {
        "mangas": 2
      }
    },
    ....
  ]
}
*/

export const GET_GENRE_DETAIL_BY_SLUG = `${BASE_URL}/api/genres/{slug}`; //GET (NO LOGIN REQUIRED)
/*
parameters
    slug: string (path) (example: action-6eccbd)
response body
{
  "success": true,
  "data": {
    "id": "cmh21pk6e0012tmioz4ubg8g1",
    "name": "Action",
    "slug": "action-6eccbd",
    "description": null,
    "createdAt": "2025-10-22T13:45:14.339Z",
    "updatedAt": "2025-10-22T13:45:14.339Z",
    "_count": {
      "mangas": 23
    }
  }
}
*/

export const GET_ALL_MANGA_OF_A_GENRE = `${BASE_URL}/api/genres/{slug}/manga`; //GET (NO LOGIN REQUIRED)
/*
parameters
    slug: string (path) (example: action-6eccbd)
    page: interger (query)
    limit: interger (query)
    sortBy: string (query) (createdAt)
    order: string (query) (asc, desc)
response body
{
  "success": true,
  "genre": {
    "id": "cmh21pk6e0012tmioz4ubg8g1",
    "name": "Action",
    "slug": "action-6eccbd",
    "description": null,
    "createdAt": "2025-10-22T13:45:14.339Z",
    "updatedAt": "2025-10-22T13:45:14.339Z"
  },
  "manga": [
    {
      "id": "cmh221lj20001tmt8xrswei3q",
      "mangaId": null,
      "title": "TEST",
      "slug": "test",
      "alternativeTitles": [
        "TEST"
      ],
      "description": "TEST",
      "thumbnail": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141270/manga/covers/yhz8c3wl7zjgnkqogtl5.jpg",
      "coverImage": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141271/manga/covers/pe3oe1diouscpqmj7nzo.png",
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": 2025,
      "totalChapters": 1,
      "totalViews": 5,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": "cmh21v5d70000tmqguscsr4je",
      "createdAt": "2025-10-22T13:54:35.575Z",
      "updatedAt": "2025-11-12T10:05:25.098Z",
      "lastChapterAt": "2025-10-22T13:57:35.472Z",
      "authors": [
        {
          "id": "cmh221lj30002tmt8h9tiaqcy",
          "name": "ZuyBigPP",
          "slug": "zuybigpp"
        }
      ],
      "genres": [
        {
          "id": "cmh221lj30006tmt8j90lblvd",
          "name": "Test",
          "slug": "test"
        },
        {
          "id": "cmh21pk6e0014tmioiavb7uhl",
          "name": "Fantasy",
          "slug": "fantasy-1a0b4b"
        },
        {
          "id": "cmh21pk6e0013tmioir0mt3u7",
          "name": "Adventure",
          "slug": "adventure-95da5b"
        },
        {
          "id": "cmh21pk6e0012tmioz4ubg8g1",
          "name": "Action",
          "slug": "action-6eccbd"
        }
      ],
      "_count": {
        "chapters": 1,
        "bookmarks": 0
      }
    },
    {
      "id": "cmh21t8kp01r7tmiomh68tai8",
      "mangaId": "221499",
      "title": "Monster Pet Evolution",
      "slug": "monster-pet-evolution-87f836",
      "alternativeTitles": [
        "Monster Pet Evolution"
      ],
      "description": "The world experienced a cataclysm and monsters are now roaming the Earth. Born out of a necessity to subjugate these monsters, this new era saw the rise of a new profession. Monster Trainers – individuals who conquer, cultivate, and train these monsters. Thus begins the story of Gao Peng. An ambitious young man with dreams of his own, who gets launched right into the golden age of monster cultivation. Gao Peng: “Even if it’s a loach, I’ll be able to evolve it into a dragon that can soar to the heavens!”.",
      "thumbnail": "https://mangapark.org/thumb/W600/ampi/02f/02fc1df84669615dfb3be8d4ba66424004375143_480_639_455572.png",
      "coverImage": null,
      "status": "ONGOING",
      "approvalStatus": "APPROVED",
      "releaseYear": null,
      "totalChapters": 155,
      "totalViews": 0,
      "totalBookmarks": 0,
      "averageRating": 0,
      "totalRatings": 0,
      "uploaderId": null,
      "createdAt": "2025-10-22T13:48:05.928Z",
      "updatedAt": "2025-10-22T13:48:05.928Z",
      "lastChapterAt": "2025-10-22T13:48:05.915Z",
      "authors": [
        {
          "id": "cmh21phw9000itmiofgh26874",
          "name": "name",
          "slug": "name-dc4f9e"
        }
      ],
      "genres": [
        {
          "id": "cmh21t8kq01rdtmio9p6zftgc",
          "name": "Cultivation",
          "slug": "cultivation-ccc2e8"
        },
        {
          "id": "cmh21ppx4001xtmiotscaytll",
          "name": "Manhua",
          "slug": "manhua-3831f9"
        },
        {
          "id": "cmh21pk6e0014tmioiavb7uhl",
          "name": "Fantasy",
          "slug": "fantasy-1a0b4b"
        },
        {
          "id": "cmh21pk6e0013tmioir0mt3u7",
          "name": "Adventure",
          "slug": "adventure-95da5b"
        },
        {
          "id": "cmh21pk6e0012tmioz4ubg8g1",
          "name": "Action",
          "slug": "action-6eccbd"
        }
      ],
      "_count": {
        "chapters": 155,
        "bookmarks": 0
      }
    },
    ...
  ]
}
*/


//Reading history
export const GET_READING_HISTORY = `${BASE_URL}/api/reading-history`; //GET
/*
parameters
    page: interger (query)
    limit: interger (query)
    mangaId: string (query) (optional)
    sortBy: string (query) (createdAt)
    order: string (query) (asc, desc)
response body
{
  "success": true,
  "data": [
    {
      "id": "cmhvu3p5m0005tmqc1zjppaj1",
      "userId": "cmhorhan00000tmp47bc8me7s",
      "mangaId": "cmh221lj20001tmt8xrswei3q",
      "chapterId": "cmh225fub0008tmt8sr2zgpyu",
      "currentPage": 1,
      "totalPages": 3,
      "progressPercent": 33,
      "isCompleted": false,
      "lastReadAt": "2025-11-12T10:05:22.328Z",
      "createdAt": "2025-11-12T10:05:22.330Z",
      "manga": {
        "id": "cmh221lj20001tmt8xrswei3q",
        "mangaId": null,
        "title": "TEST",
        "slug": "test",
        "alternativeTitles": [
          "TEST"
        ],
        "description": "TEST",
        "thumbnail": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141270/manga/covers/yhz8c3wl7zjgnkqogtl5.jpg",
        "coverImage": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141271/manga/covers/pe3oe1diouscpqmj7nzo.png",
        "status": "ONGOING",
        "approvalStatus": "APPROVED",
        "releaseYear": 2025,
        "totalChapters": 1,
        "totalViews": 5,
        "totalBookmarks": 0,
        "averageRating": 0,
        "totalRatings": 0,
        "uploaderId": "cmh21v5d70000tmqguscsr4je",
        "createdAt": "2025-10-22T13:54:35.575Z",
        "updatedAt": "2025-11-12T10:05:25.098Z",
        "lastChapterAt": "2025-10-22T13:57:35.472Z",
        "authors": [
          {
            "id": "cmh221lj30002tmt8h9tiaqcy",
            "name": "ZuyBigPP",
            "slug": "zuybigpp"
          }
        ],
        "genres": [
          {
            "id": "cmh221lj30006tmt8j90lblvd",
            "name": "Test",
            "slug": "test"
          },
          {
            "id": "cmh21pk6e0014tmioiavb7uhl",
            "name": "Fantasy",
            "slug": "fantasy-1a0b4b"
          },
          {
            "id": "cmh21pk6e0013tmioir0mt3u7",
            "name": "Adventure",
            "slug": "adventure-95da5b"
          },
          {
            "id": "cmh21pk6e0012tmioz4ubg8g1",
            "name": "Action",
            "slug": "action-6eccbd"
          }
        ],
        "_count": {
          "chapters": 1
        }
      },
      "chapter": {
        "id": "cmh225fub0008tmt8sr2zgpyu",
        "chapterNumber": 1,
        "title": "Chapter 1: The TEST",
        "slug": "test-ch-1",
        "totalImages": 3
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
*/

export const CLEAR_READING_HISTORY = `${BASE_URL}/api/reading-history`; //DELETE
/*
response body
{
  "success": true,
  "message": "All reading history cleared"
}
 */

export const GET_CONTINUE_READING = `${BASE_URL}/api/reading-history/continue-reading`; //GET
/*
response body
{
  "success": true,
  "data": [
    {
      "id": "cmhvu3p5m0005tmqc1zjppaj1",
      "userId": "cmhorhan00000tmp47bc8me7s",
      "mangaId": "cmh221lj20001tmt8xrswei3q",
      "chapterId": "cmh225fub0008tmt8sr2zgpyu",
      "currentPage": 1,
      "totalPages": 3,
      "progressPercent": 33,
      "isCompleted": false,
      "lastReadAt": "2025-11-12T10:05:22.328Z",
      "createdAt": "2025-11-12T10:05:22.330Z",
      "manga": {
        "id": "cmh221lj20001tmt8xrswei3q",
        "mangaId": null,
        "title": "TEST",
        "slug": "test",
        "alternativeTitles": [
          "TEST"
        ],
        "description": "TEST",
        "thumbnail": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141270/manga/covers/yhz8c3wl7zjgnkqogtl5.jpg",
        "coverImage": "https://res.cloudinary.com/daxfqwxps/image/upload/v1761141271/manga/covers/pe3oe1diouscpqmj7nzo.png",
        "status": "ONGOING",
        "approvalStatus": "APPROVED",
        "releaseYear": 2025,
        "totalChapters": 1,
        "totalViews": 5,
        "totalBookmarks": 0,
        "averageRating": 0,
        "totalRatings": 0,
        "uploaderId": "cmh21v5d70000tmqguscsr4je",
        "createdAt": "2025-10-22T13:54:35.575Z",
        "updatedAt": "2025-11-12T10:05:25.098Z",
        "lastChapterAt": "2025-10-22T13:57:35.472Z",
        "authors": [
          {
            "id": "cmh221lj30002tmt8h9tiaqcy",
            "name": "ZuyBigPP",
            "slug": "zuybigpp"
          }
        ],
        "genres": [
          {
            "id": "cmh221lj30006tmt8j90lblvd",
            "name": "Test",
            "slug": "test"
          },
          {
            "id": "cmh21pk6e0014tmioiavb7uhl",
            "name": "Fantasy",
            "slug": "fantasy-1a0b4b"
          },
          {
            "id": "cmh21pk6e0013tmioir0mt3u7",
            "name": "Adventure",
            "slug": "adventure-95da5b"
          },
          {
            "id": "cmh21pk6e0012tmioz4ubg8g1",
            "name": "Action",
            "slug": "action-6eccbd"
          }
        ],
        "_count": {
          "chapters": 1
        }
      },
      "chapter": {
        "id": "cmh225fub0008tmt8sr2zgpyu",
        "chapterNumber": 1,
        "title": "Chapter 1: The TEST",
        "slug": "test-ch-1",
        "totalImages": 3
      }
    }
  ]
}
*/

export const GET_READING_PROGRESS = `${BASE_URL}/api/reading-history/manga/{mangaId}`; //GET
/*
parameters
    mangaId: string (path) (example: cmh21q3yw00e2tmioxgp7v2ac)
response body
{
  "success": true,
  "data": {
    "lastRead": {
      "id": "cmhvu3p5m0005tmqc1zjppaj1",
      "userId": "cmhorhan00000tmp47bc8me7s",
      "mangaId": "cmh221lj20001tmt8xrswei3q",
      "chapterId": "cmh225fub0008tmt8sr2zgpyu",
      "currentPage": 1,
      "totalPages": 3,
      "progressPercent": 33,
      "isCompleted": false,
      "lastReadAt": "2025-11-12T10:05:22.328Z",
      "createdAt": "2025-11-12T10:05:22.330Z",
      "chapter": {
        "id": "cmh225fub0008tmt8sr2zgpyu",
        "chapterNumber": 1,
        "title": "Chapter 1: The TEST",
        "slug": "test-ch-1",
        "totalImages": 3
      }
    },
    "totalChapters": 1,
    "readChapters": 0,
    "progressPercent": 0,
    "allHistory": [
      {
        "id": "cmhvu3p5m0005tmqc1zjppaj1",
        "userId": "cmhorhan00000tmp47bc8me7s",
        "mangaId": "cmh221lj20001tmt8xrswei3q",
        "chapterId": "cmh225fub0008tmt8sr2zgpyu",
        "currentPage": 1,
        "totalPages": 3,
        "progressPercent": 33,
        "isCompleted": false,
        "lastReadAt": "2025-11-12T10:05:22.328Z",
        "createdAt": "2025-11-12T10:05:22.330Z",
        "chapter": {
          "id": "cmh225fub0008tmt8sr2zgpyu",
          "chapterNumber": 1,
          "title": "Chapter 1: The TEST",
          "slug": "test-ch-1",
          "totalImages": 3
        }
      }
    ]
  }
}
*/


export const CLEAR_READING_PROGRESS = `${BASE_URL}/api/reading-history/manga/{mangaId}`; //DELETE
/*
parameters
    mangaId: string (path) (example: cmh21q3yw00e2tmioxgp7v2ac)
response body
{
  "success": true,
  "message": "Manga reading history cleared"
}
*/

export const SAVE_READING_PROGRESS_FOR_A_CHAPTER = `${BASE_URL}/api/reading-history/chapters/{chapterId}`; //POST
/*
parameters
    chapterId: string (path) (example: cmh21sl8701hntmiod47dwjla)
request body
{
  "currentPage": interger,
  "totalPages": interger,
  "isCompleted": boolean
}
response body
{
  "success": true,
  "data": {
    "id": "cm4jqf1gs0000p8ug1s9qghp6",
    "userId": "string",
    "mangaId": "string",
    "chapterId": "string",
    "currentPage": interger,
    "totalPages": interger,
    "progressPercent": interger,
    "isCompleted": boolean,
    "lastReadAt": "2025-11-14T13:45:58.225Z",
    "createdAt": "2025-11-14T13:45:58.225Z",
    "manga": {
      "id": "string",
      "title": "string",
      "slug": "string",
      "thumbnail": "string"
    },
    "chapter": {
      "id": "string",
      "chapterNumber": 0,
      "title": "string",
      "slug": "string"
    }
  },
  "message": "Reading progress saved"
}
*/

