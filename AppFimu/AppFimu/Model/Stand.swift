//
//  Stand.swift
//  AppFimu
//
//  Created by valentin mougenot on 29/03/2023.
//

import Foundation
import MapKit
import _MapKit_SwiftUI
import SwiftUI

struct Stand: Identifiable, Codable, Hashable, MapAnnotationItem{
    var id: Int
    var libelle: String
    var latitude: Double
    var longitude: Double
    var typestand: TypeStand
    var services: [Service]
    
    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude ), longitude: CLLocationDegrees(longitude ))
    }
    
    var annotation: some MapAnnotationProtocol {
        MapAnnotation(coordinate: coordinate) {
            ZStack(alignment: .center) {
                Circle()
                    .foregroundColor(.clear)
                    .frame(width: 30, height: 30, alignment: .center)
                           
                typestand.icone
            }
            .scaleEffect(1.5, anchor: .center)
        }
    }
    
}

