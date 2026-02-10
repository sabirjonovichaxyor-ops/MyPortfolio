import { useAdminMessages } from '../messages/model/useAdminMessages'
import MessagesTable from '../../../shared/ui/ui-decorative/MessagesTable'

const AdminMessages = () => {
  const { messages, isLoading, markAsRead } = useAdminMessages()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Xabarlar</h1>
        <div className="text-sm text-gray-500">
          Jami: {messages.length} ta
        </div>
      </div>

      <MessagesTable 
        messages={messages} 
        onMarkRead={markAsRead}
      />
    </div>
  )
}

export default AdminMessages