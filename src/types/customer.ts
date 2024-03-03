export interface ICustomerInfo {
    Id: string;
    FulllName: string;
    Password?: string; // Giả sử bạn không muốn hiển thị thông tin này
    Phone: string;
    UpDate: string;
    InsDate: string | null;
    ImageURL: string;
    Deflag: boolean;
    Address: string;
  }