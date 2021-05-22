import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";
import { ObjectID } from 'mongodb';
import INotificationRepository from "../INotificationsRepository";


export default class FakeNotificationsRepository implements INotificationRepository{
  private notifications: Notification[] = []

  async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
      read: false,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.notifications.push(notification)

    return notification
  }


}
