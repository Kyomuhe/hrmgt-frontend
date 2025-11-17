import overView from '../../assets/overView.png';

const DashboardOverview = () => {
    return (
        <div className="bg-[#F8F6FE] rounded-3xl p-8 shadow-2xl max-w-2xl hidden md:block">
            <img
                className='w-140 h-140'
                src={overView}
                alt="Dashboard Overview"
            />
        </div>

    )
}
export default DashboardOverview;