import { ContactMessage } from "@/entities/contact/ContactMessage"
import { MessageStatus } from "@/entities/contact/MessageStatus"

type MessagesTableProps = {
  messages: ContactMessage[]
  onMarkRead?: (id: string) => void
  onDelete?: (id: string) => void
}

export function MessagesTable({ messages, onMarkRead, onDelete }: MessagesTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Yuboruvchi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mavzu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sana
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Amal
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {msg.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {msg.email}
                  </p>
                </td>

                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {msg.subject}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    msg.status === MessageStatus.READ
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}>
                    {msg.status === MessageStatus.READ ? "O'qilgan" : "Yangi"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(msg.createdAt!).toLocaleDateString("uz-UZ")}
                </td>

                <td className="px-6 py-4 text-right">
                  {msg.status !== MessageStatus.READ && (
                    <button
                      onClick={() => onMarkRead?.(msg.id!)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                      O‘qilgan
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {messages.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            Xabarlar mavjud emas
          </p>
        )}
      </div>
    </div>
  )
}

export default MessagesTable