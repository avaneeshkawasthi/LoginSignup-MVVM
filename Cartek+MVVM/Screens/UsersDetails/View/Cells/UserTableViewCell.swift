//
//  UserTableViewCell.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import UIKit

class UserTableViewCell: UITableViewCell {

    @IBOutlet weak var userBackgroundView: UIView!
    @IBOutlet weak var userNameLabel: UILabel!
    @IBOutlet weak var userContactLabel: UILabel!
    @IBOutlet weak var userEmailLabel: UILabel!
    @IBOutlet weak var userAddressLabel: UILabel!
    @IBOutlet weak var userCompnyInfoLabel: UILabel!
    @IBOutlet weak var userWebsiteInfoLabel: UILabel!
    

    var user: User? {
        didSet { // Property Observer
            userDetailConfiguration()
        }
    }

    override func awakeFromNib() {
        super.awakeFromNib()
        userBackgroundView.clipsToBounds = false
        userBackgroundView.layer.cornerRadius = 15
        self.userBackgroundView.backgroundColor = .systemGray6
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }

    func userDetailConfiguration() {
        guard let userData = user else { return }
        userNameLabel.text = userData.name
        userContactLabel.text = userData.phone
        userEmailLabel.text = userData.email
        userWebsiteInfoLabel.text = userData.company.name
        userCompnyInfoLabel.text = userData.website
        if let street = userData.address.street as? String , let suit = userData.address.suite as? String, let city = userData.address.city as? String, let zip = userData.address.zipcode as? String {
            userAddressLabel.text = street + "," + suit + "," + city + zip
        }
    }
}
