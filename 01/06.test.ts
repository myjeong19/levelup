import { actor, shallowCopy, deepCopy, type Actor, type Address } from './04.object_copy';
import { sum, type Result } from './05.memoization';

type EqualHandler<T> = {
  title: string;
  type: 'toEqual' | 'notToEqual';
  to: T;
  from: T;
};

function equalHandler<T>(values: EqualHandler<T>) {
  if (values.type === 'toEqual') {
    test(values.title, () => expect(values.to).toEqual(values.from));
  } else {
    test(values.title, () => expect(values.to).not.toEqual(values.from));
  }
}

describe('객체 복사', () => {
  equalHandler<Actor>({
    title: 'actor와 shallowCopy가 다른 경우',
    type: 'notToEqual',
    to: shallowCopy,
    from: actor,
  });

  equalHandler<string>({
    title: 'actor.firstName과 shallowCopy.firstName이 다른 경우',
    type: 'notToEqual',
    to: shallowCopy.firstName,
    from: actor.firstName,
  });

  equalHandler<string>({
    title: 'actor.address와 shallowCopy.address가 같은 경우',
    type: 'toEqual',
    to: shallowCopy.address.city,
    from: actor.address.city,
  });

  equalHandler<Actor>({
    title: 'actor와 deeCopy가 다른 경우',
    type: 'notToEqual',
    to: deepCopy,
    from: actor,
  });

  equalHandler<string>({
    title: 'actor.firstName과 deepCopy.firstName이 같은 경우',
    type: 'toEqual',
    to: deepCopy.firstName,
    from: actor.firstName,
  });

  equalHandler<Address>({
    title: 'actor.address와 deepCopy.address가 다른 경우',
    type: 'notToEqual',
    to: deepCopy.address,
    from: actor.address,
  });
});

describe('메모이제이션 함수', () => {
  const result = sum(1, 2, '+');
  const firstResult = result();
  const secondResult = result();
  const threeResult = result();

  test('기대값 일치', () => expect(firstResult.value).toBe(3));

  equalHandler<Result>({
    title: '캐싱된 경우',
    type: 'toEqual',
    to: threeResult,
    from: secondResult,
  });

  equalHandler<Result>({
    title: '캐싱되지 않은 경우',
    type: 'notToEqual',
    to: firstResult,
    from: secondResult,
  });
});
