// dummyData.js

export const actorData = {
    id: 1,
    name: "김서준",
    profileImage: "https://example.com/kim-seo-jun.jpg",
    bio: "1993년 10월 4일생. 한국의 배우. 드라마 '이태원 클라쓰'로 큰 인기를 얻었다.",
    filmography: [
      { id: 1, title: "이태원 클라쓰", year: 2020, role: "박새로이" },
      { id: 2, title: "쌈, 마이웨이", year: 2017, role: "고동만" },
    ],
    awards: [
      { id: 1, name: "백상예술대상", category: "TV부문 남자 최우수 연기상", year: 2020 },
      { id: 2, name: "APAN Star Awards", category: "Top Excellence Award", year: 2020 },
    ]
  };
  
  export const filmoData = [
    { id: 1, title: "이태원 클라쓰", type: "드라마", character: "박새로이" },
    { id: 2, title: "기생충", type: "영화", character: "기우" },
    { id: 3, title: "햄릿", type: "연극", character: "햄릿" },
    { id: 4, title: "나 혼자 산다", type: "예능", episode: "Episode 123" },
  ];
  
  export const ottWorksData = [
    { id: 1, title: "이태원 클라쓰", ott: "netflix", image: "https://example.com/itaewon-class.jpg" },
    { id: 2, title: "킹덤", ott: "netflix", image: "https://example.com/kingdom.jpg" },
    { id: 3, title: "미스터 션샤인", ott: "watcha", image: "https://example.com/mr-sunshine.jpg" },
    { id: 4, title: "복수가 돌아왔다", ott: "wavve", image: "https://example.com/revenge.jpg" },
    { id: 5, title: "만달로리안", ott: "disney", image: "https://example.com/mandalorian.jpg" },
  ];
  
  export const specialFeatureData = {
    title: "2023년 화제의 드라마 특집",
    image: "https://example.com/2023-dramas.jpg",
    intro: "2023년을 빛낸 최고의 드라마들을 소개합니다. 올해의 트렌드와 시청자들의 취향 변화를 알아봅니다.",
    content: "2023년 한국 드라마 시장은 다양성과 글로벌 경쟁력을 동시에 입증했습니다. OTT 플랫폼의 성장과 함께...",
    relatedWorks: [
      { id: 1, title: "더 글로리", image: "https://example.com/the-glory.jpg" },
      { id: 2, title: "모래에도 꽃이 핀다", image: "https://example.com/moving.jpg" },
      { id: 3, title: "대장금이 돌아왔다", image: "https://example.com/daejanggeum.jpg" },
    ]
  };