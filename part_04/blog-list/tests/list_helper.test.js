const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    id: '601fa9277f31e518453f2ba2',
    title: 'Helpful tips',
    author: 'Mr. Nice',
    url: 'http://www.mrnice.com/blog/12',
    likes: 112,
    v: 0,
  },
  {
    id: '601fa9c97f31e518453f2ba3',
    title: 'Seven things to learn',
    author: 'Mr. Nice',
    url: 'http://www.mrnice.com/blog/12',
    likes: 144,
    v: 0,
  },
  {
    id: '601fb5e5c41a4d1f2d93b502',
    title: 'Try to have fun',
    author: 'Mr. Nice',
    url: 'http://www.mrnice.com/blog/14',
    likes: 173,
    v: 0,
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog))
      .toBe(listWithOneBlog[0].likes);
  });

  test('of a bigger list is correctly calculated', () => {
    expect(listHelper.totalLikes(blogs))
      .toBe(465);
  });
});

describe('favorite blog', () => {
  const favorite = {
    id: '601fb5e5c41a4d1f2d93b502',
    title: 'Try to have fun',
    author: 'Mr. Nice',
    url: 'http://www.mrnice.com/blog/14',
    likes: 173,
    v: 0,
  };

  test('correctly handles an empty list of blogs', () => {
    expect(listHelper.favoriteBlog([]))
      .toEqual(undefined);
  });

  test('return the only blog in a list with just one blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog))
      .toEqual(listWithOneBlog[0]);
  });

  test('correctly find the most favorite blog in list of blogs', () => {
    expect(listHelper.favoriteBlog(blogs))
      .toEqual(favorite);
  });
});

describe('author with most blogs', () => {
  test('handle empty list of blogs by returning undefined', () => {
    expect(listHelper.mostBlogs([]))
      .toEqual({
        author: undefined,
        blogs: undefined,
      });
  });

  test('return the author in the list of just one', () => {
    expect(listHelper.mostBlogs(listWithOneBlog))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      });
  });

  test('return the correct author with most blogs in a larger list', () => {
    expect(listHelper.mostBlogs(blogs))
      .toEqual({
        author: 'Mr. Nice',
        blogs: 3,
      });
  });
});

describe('author with most likes', () => {
  test('handle empty list of blogs', () => {
    expect(listHelper.mostLikes([]))
      .toEqual({
        author: undefined,
        likes: undefined,
      });
  });

  test('return correct response when only one author exists', () => {
    expect(listHelper.mostLikes(listWithOneBlog))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5,
      });
  });

  test('return the correct author with most likes in a larger list', () => {
    expect(listHelper.mostLikes(blogs))
      .toEqual({
        author: 'Mr. Nice',
        likes: 429,
      });
  });
});
