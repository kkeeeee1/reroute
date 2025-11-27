import { defineQuery } from "next-sanity";

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
    },
  }
`);

export const b2bPageQuery = defineQuery(`
  *[_type == "b2b"][0]{
    _id,
    _type,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
    },
  }
`);

export const b2cPageQuery = defineQuery(`
  *[_type == "b2c"][0]{
    _id,
    _type,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
    },
  }
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "about"][0]{
    _id,
    _type,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
    },
  }
`);

export const worksPageQuery = defineQuery(`
  *[_type == "works"][0]{
    _id,
    _type,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
    },
  }
`);

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    defaultSeo {
      metaTitle,
      metaDescription,
      keywords,
    },
    ogImage,
  }
`);

export const appListQuery = defineQuery(`
  *[_type == "app"] | order(createdAt desc)[0...12]{
    _id,
    appId,
    name,
    summary,
    thumbnail,
  }
`);

export const appListCountQuery = defineQuery(`
  count(*[_type == "app"])
`);

export const appListPaginatedQuery = defineQuery(`
  *[_type == "app"] | order(createdAt desc)[$skip...$skip + $limit]{
    _id,
    appId,
    name,
    summary,
    thumbnail,
  }
`);

export const appDetailQuery = defineQuery(`
  *[_type == "app" && appId == $appId][0]{
    _id,
    appId,
    name,
    summary,
    thumbnail,
    content,
    createdAt,
    "prevApp": *[_type == "app" && createdAt < ^.createdAt] | order(createdAt desc)[0]{
      appId,
      name
    },
    "nextApp": *[_type == "app" && createdAt > ^.createdAt] | order(createdAt asc)[0]{
      appId,
      name
    }
  }
`);

export const workListQuery = defineQuery(`
  *[_type == "work"] | order(createdAt desc)[0...12]{
    _id,
    workId,
    name,
    summary,
    thumbnail,
  }
`);

export const workListCountQuery = defineQuery(`
  count(*[_type == "work"])
`);

export const workListPaginatedQuery = defineQuery(`
  *[_type == "work"] | order(createdAt desc)[$skip...$skip + $limit]{
    _id,
    workId,
    name,
    summary,
    thumbnail,
  }
`);

export const workDetailQuery = defineQuery(`
  *[_type == "work" && workId == $workId][0]{
    _id,
    workId,
    name,
    summary,
    thumbnail,
    startDate,
    endDate,
    role,
    content,
    createdAt,
    "prevWork": *[_type == "work" && createdAt < ^.createdAt] | order(createdAt desc)[0]{
      workId,
      name
    },
    "nextWork": *[_type == "work" && createdAt > ^.createdAt] | order(createdAt asc)[0]{
      workId,
      name
    }
  }
`);
