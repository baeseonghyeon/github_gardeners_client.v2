export interface IUser {
    // 깃허브 내 아이디
    id: Number;
    login: string;
    html_url: string;
    avatar_url: string;
    name: string;
    company: string;
    blog: string;
    email: string;
    bio: string;
    api_url: string;
    events_url: string;
    is_admin : boolean;
};

export default IUser;