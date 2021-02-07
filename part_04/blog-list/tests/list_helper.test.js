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
      .toBe(429);
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
