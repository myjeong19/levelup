export interface Address {
  city: string;
  state: string;
}

export interface Actor {
  firstName: string;
  lastName: string;
  address: Address;
}

export const actor: Actor = {
  firstName: 'Emma',
  lastName: 'Myers',
  address: {
    city: 'Seongdong',
    state: 'Seoul',
  },
};

// 얕은 복사

export const shallowCopy: Actor = Object.assign({}, actor); // 독립된 객체 클론

shallowCopy.firstName = 'Minyeong';
shallowCopy.address.city = 'Gwangin';

// 깊은 복사

export const deepCopy: Actor = JSON.parse(JSON.stringify(actor));

deepCopy.address.city = 'Yongsan';
