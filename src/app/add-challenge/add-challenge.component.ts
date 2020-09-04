import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChallengesStoreService, ChallengeStoreDto} from '../challenges/challenges-store.service';
import {LoaderService} from '../layout/loader/loader.service';
import {formatDate} from '../utils';

@Component({
    selector: 'app-add-challenge',
    templateUrl: './add-challenge.component.html',
    styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent implements OnInit {
    formSubmitted = false;
    myForm: FormGroup;

    name: FormControl;
    startDate: FormControl;
    segmentIds: FormControl;
    endDate: FormControl;

    constructor(private challengeService: ChallengesStoreService,
                private router: Router,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.startDate = new FormControl('', Validators.required);
        this.segmentIds = new FormControl('', Validators.required);
        this.endDate = new FormControl('', [Validators.required]);

        this.myForm = new FormGroup({
            name: this.name,
            segmentIds: this.segmentIds,
            startDate: this.startDate,
            endDate: this.endDate
        });
    }

    addChallenge() {
        this.loaderService.showLoader();
        this.challengeService.add(this.readChallenge()).subscribe(result => {
            this.formSubmitted = true;
            this.loaderService.hideLoader();
            this.router.navigateByUrl('/challenges');
        });
    }

    private readChallenge() {
        return {
            id: null,
            name: this.name.value,
            startDate: this.startDate.value,
            endDate: this.endDate.value,
            segmentIds: this.segmentIds.value.split(',').map(seg => Number(seg)),
            athleteIds: []
        };
    }
}
