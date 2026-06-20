import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-gray-300 bg-gray-50 p-6">
      <p className="mb-1 text-sm font-medium text-gray-500">Total:</p>
      <p className="mb-6 text-3xl font-medium text-blue-500">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}
