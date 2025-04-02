import { Edit, Trash2 } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  onOpen: () => void;
};

export default function ActionButtons({ onEdit, onDelete, onOpen }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        className="flex items-center rounded px-1 py-1 text-blue-600 transition-colors hover:bg-blue-50"
        onClick={onEdit}
      >
        <Edit className="sm:h-3 sm:w-3 md:h-4 md:w-4" strokeWidth={2.2} />
        <span className="ml-1 whitespace-nowrap text-sm font-semibold">
          수정
        </span>
      </button>
      <button
        className="flex items-center rounded px-1 py-1 text-red-600 transition-colors hover:bg-red-50"
        onClick={() => {
          onOpen();
          onDelete();
        }}
      >
        <Trash2 className="sm:h-3 sm:w-3 md:h-4 md:w-4" strokeWidth={2.2} />
        <span className="ml-1 whitespace-nowrap text-sm font-semibold">
          삭제
        </span>
      </button>
    </div>
  );
}
