//
//  MapView.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI
import MapKit

@MainActor
struct MapView: View {
    
    @EnvironmentObject var dataStand: StandViewModel
    @EnvironmentObject var dataScene: SceneViewModel
    @State private var selectedStand: Stand?
    @State private var selectedScene: Scenes?
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 47.6384449, longitude: 6.8637375),
        span: MKCoordinateSpan(latitudeDelta: 0.005, longitudeDelta: 0.005)
    )
    
    var allAnnotationItems: [AnyMapAnnotationItem] {
        let sceneItems = dataScene.scenes.map { AnyMapAnnotationItem($0) }
        let standItems = dataStand.stands.map { AnyMapAnnotationItem($0) }
        return sceneItems + standItems
    }
    
    var body: some View {
        NavigationView {
            Map(coordinateRegion: $region, annotationItems: allAnnotationItems) { item in
                MapAnnotation(coordinate: item.coordinate) {
                    ZStack(alignment: .center) {
                        Circle()
                            .foregroundColor(.clear)
                            .frame(width: 30, height: 30, alignment: .center)
                               
                        if let scene = item.base as? Scenes {
                            scene.typescene.icone
                                .onTapGesture {
                                    handleAnnotationTap(item: scene)
                                }
                        } else if let stand = item.base as? Stand {
                            stand.typestand.icone
                                .onTapGesture {
                                    handleAnnotationTap(item: stand)
                                }
                        }
                    }
                }
            }
            .sheet(item: $selectedStand) { stand in
                StandDetailView(stand: stand)
                    .presentationDetents([.fraction(0.3), .fraction(0.5), .fraction(0.8)])
            }
            .sheet(item: $selectedScene) { scene in
                SceneDetailView(scene: scene)
                    .presentationDetents([.fraction(0.3)])
            }
            .ignoresSafeArea(edges: .top)
        }
    }
    
    func handleAnnotationTap<T: Identifiable>(item: T) {
        if item is Scenes {
            selectedScene = item as? Scenes
        } else if item is Stand {
            selectedStand = item as? Stand
        }
    }
}

struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        MapView()
            .environmentObject(StandViewModel())
    }
}
